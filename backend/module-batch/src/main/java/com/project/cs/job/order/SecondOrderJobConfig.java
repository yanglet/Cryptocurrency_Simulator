package com.project.cs.job.order;

import com.project.cs.cryptocurrency.dto.CryptocurrencyDto;
import com.project.cs.cryptocurrency.repository.CryptocurrencyRepository;
import com.project.cs.order.service.OrderService;
import com.project.cs.orderitem.entity.OrderItem;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;
import java.math.BigDecimal;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class SecondOrderJobConfig {
    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final EntityManagerFactory entityManagerFactory;
    private final CryptocurrencyRepository cryptocurrencyRepository;
    private final OrderService orderService;
    private final int chunkSize = 1000;

    @Bean
    public Job SecondOrderItemWriterJob() {
        return jobBuilderFactory.get("orderItemWriterJob")
                .start(SecondOrderItemWriterStep())
                .build();
    }

    @Bean
    public Step SecondOrderItemWriterStep() {
        return stepBuilderFactory.get("orderItemWriterStep")
                .<OrderItem, OrderItem>chunk(chunkSize)
                .reader(SecondOrderItemWriterReader())
                .writer(SecondOrderItemWriter())
                .build();
    }

    @Bean
    public JpaPagingItemReader<OrderItem> SecondOrderItemWriterReader() {
        return new JpaPagingItemReaderBuilder<OrderItem>()
                .name("orderItemWriterReader")
                .entityManagerFactory(entityManagerFactory)
                .pageSize(chunkSize)
                .queryString("SELECT oi FROM OrderItem oi JOIN FETCH oi.order WHERE oi.order.targetYn = 'Y'")
                .build();
    }

    @Bean
    public ItemWriter<OrderItem> SecondOrderItemWriter() {
        return items -> {
            log.info("items Size = {}", items.size());
            List<CryptocurrencyDto> cryptocurrencies = cryptocurrencyRepository.findByMarkets(getMarkets(items));

            for(OrderItem orderItem : items){
                CryptocurrencyDto cryptocurrency = cryptocurrencies.stream()
                        .filter(c -> c.getMarket().equals(orderItem.getMarket()))
                        .findFirst().orElseThrow();

                double upperValue = Double.valueOf(orderItem.getPrice()) + Double.valueOf(orderItem.getPrice()) * orderItem.getOrder().getUpperBound() / 100;
                double lowerValue = Double.valueOf(orderItem.getPrice()) + Double.valueOf(orderItem.getPrice()) * orderItem.getOrder().getLowerBound() / 100;
                int upperResult = cryptocurrency.getTrade_price().compareTo(BigDecimal.valueOf(upperValue));
                int lowerResult = cryptocurrency.getTrade_price().compareTo(BigDecimal.valueOf(lowerValue));

                if(upperResult >= 0) {
                    log.info("orderId = {}", orderItem.getId());
                    orderService.completeSecondOrder(orderItem, upperValue, "UPPER");
                }

                if(lowerResult <= 0) {
                    log.info("orderId = {}", orderItem.getId());
                    orderService.completeSecondOrder(orderItem, lowerValue, "LOWER");
                }
            }
        };
    }

    private String getMarkets(List<? extends OrderItem> orderItems){
        String markets = "";

        for(OrderItem orderItem : orderItems){
            if( !markets.contains(orderItem.getMarket()) ){
                markets += orderItem.getMarket() + ",";
            }
        }

        if( markets.isBlank() ){
            return markets;
        }

        return markets.substring(0, markets.length() - 1);
    }
}
