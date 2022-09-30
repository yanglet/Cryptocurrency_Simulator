package com.project.cs.job.order;

import com.project.cs.cryptocurrency.dto.CryptocurrencyDto;
import com.project.cs.cryptocurrency.repository.CryptocurrencyRepository;
import com.project.cs.order.entity.Order;
import com.project.cs.order.service.OrderService;
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
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class OrderJobConfig {
    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final EntityManagerFactory entityManagerFactory;
    private final CryptocurrencyRepository cryptocurrencyRepository;
    private final OrderService orderService;
    private int chunkSize = 1000;

    @Bean
    public Job OrderItemWriterJob() {
        return jobBuilderFactory.get("orderItemWriterJob")
                .start(OrderItemWriterStep())
                .build();
    }

    @Bean
    public Step OrderItemWriterStep() {
        return stepBuilderFactory.get("orderItemWriterStep")
                .<Order, Order>chunk(chunkSize)
                .reader(OrderItemWriterReader())
                .writer(OrderItemWriter())
                .build();
    }

    @Bean
    public JpaPagingItemReader<Order> OrderItemWriterReader() {
        return new JpaPagingItemReaderBuilder<Order>()
                .name("orderItemWriterReader")
                .entityManagerFactory(entityManagerFactory)
                .pageSize(chunkSize)
                .queryString("SELECT o FROM Order o WHERE status = 'wait'")
                .build();
    }

    @Bean
    public ItemWriter<Order> OrderItemWriter() {
        return items -> {
            log.info("items Size = {}", items.size());
            List<CryptocurrencyDto> cryptocurrencies = cryptocurrencyRepository.findByMarkets(getMarkets(items));

            for(Order order : items){
                CryptocurrencyDto cryptocurrency = cryptocurrencies.stream()
                        .filter(c -> c.getMarket().equals(order.getMarket()))
                        .findFirst().orElseThrow();

                if(cryptocurrency.getTrade_price().equals(order.getPrice())){
                    log.info("orderId = {}", order.getId());
                    orderService.completeOrder(order);
                }
            }
        };
    }

    private String getMarkets(List<? extends Order> orders){
        String markets = "";

        for(Order order : orders){
            if( !markets.contains(order.getMarket()) ){
                markets += order.getMarket() + ",";
            }
        }

        if( markets.isBlank() ){
            return markets;
        }

        return markets.substring(0, markets.length() - 1);
    }
}
