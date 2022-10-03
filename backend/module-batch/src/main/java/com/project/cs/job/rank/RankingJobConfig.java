package com.project.cs.job.rank;

import com.project.cs.member.entity.Member;
import com.project.cs.ranking.service.RankingService;
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

@Slf4j
@RequiredArgsConstructor
@Configuration
public class RankingJobConfig {
    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final EntityManagerFactory entityManagerFactory;
    private final RankingService rankingService;
    private final int chunkSize = 1000;

    @Bean
    public Job RankingItemWriterJob() {
        return jobBuilderFactory.get("rankingItemWriterJob")
                .start(RankingItemWriterStep())
                .build();
    }

    @Bean
    public Step RankingItemWriterStep() {
        return stepBuilderFactory.get("rankingItemWriterStep")
                .<Member, Member>chunk(chunkSize)
                .reader(RankingItemWriterReader())
                .writer(RankingItemWriter())
                .build();
    }

    @Bean
    public JpaPagingItemReader<Member> RankingItemWriterReader() {
        return new JpaPagingItemReaderBuilder<Member>()
                .name("rankingItemWriterReader")
                .entityManagerFactory(entityManagerFactory)
                .pageSize(chunkSize)
                .queryString("SELECT m FROM Member m JOIN FETCH m.ranking")
                .build();
    }

    @Bean
    public ItemWriter<Member> RankingItemWriter() {
        return items -> {
            log.info("items Size = {}", items.size());
            rankingService.initRankings();
        };
    }
}
