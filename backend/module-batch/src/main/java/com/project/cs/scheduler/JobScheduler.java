package com.project.cs.scheduler;

import com.project.cs.job.order.OrderJobConfig;
import com.project.cs.job.order.SecondOrderJobConfig;
import com.project.cs.job.rank.RankingJobConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JobScheduler {
    private final JobLauncher jobLauncher;
    private final OrderJobConfig orderJobConfig;
    private final RankingJobConfig rankJobConfig;
    private final SecondOrderJobConfig secondOrderJobConfig;

    @Scheduled(cron = "0/1 * * * * *", zone = "Asia/Seoul") // 1초마다 반복
    public void runOrderJob() throws JobInstanceAlreadyCompleteException, JobExecutionAlreadyRunningException, JobParametersInvalidException, JobRestartException {
        Map<String, JobParameter> confMap = new HashMap<>();
        confMap.put("time", new JobParameter(System.currentTimeMillis()));
        JobParameters jobParameters = new JobParameters(confMap);

        jobLauncher.run(orderJobConfig.OrderItemWriterJob(), jobParameters);
    }

    @Scheduled(cron = "0 0/1 * * * *", zone = "Asia/Seoul") // 1분마다 반복
    public void runRankJob() throws JobInstanceAlreadyCompleteException, JobExecutionAlreadyRunningException, JobParametersInvalidException, JobRestartException {
        Map<String, JobParameter> confMap = new HashMap<>();
        confMap.put("time", new JobParameter(System.currentTimeMillis()));
        JobParameters jobParameters = new JobParameters(confMap);

        jobLauncher.run(rankJobConfig.RankingItemWriterJob(), jobParameters);
    }

    @Scheduled(cron = "0/1 * * * * *", zone = "Asia/Seoul") // 1초마다 반복
    public void runSecondOrderJob() throws JobInstanceAlreadyCompleteException, JobExecutionAlreadyRunningException, JobParametersInvalidException, JobRestartException {
        Map<String, JobParameter> confMap = new HashMap<>();
        confMap.put("time", new JobParameter(System.currentTimeMillis()));
        JobParameters jobParameters = new JobParameters(confMap);

        jobLauncher.run(secondOrderJobConfig.SecondOrderItemWriterJob(), jobParameters);
    }
}
