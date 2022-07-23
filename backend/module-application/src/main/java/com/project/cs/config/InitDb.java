package com.project.cs.config;

import com.google.gson.Gson;
import com.project.cs.test.entity.Test;
import com.project.cs.test.repository.TestRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
@RequiredArgsConstructor
public class InitDb {

    private final InitService initService;

    @PostConstruct
    public void init() throws IOException, ParseException {
        initService.dbInit();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {
        private final TestRepository testRepository;

        public void dbInit() throws IOException, ParseException {
            ClassPathResource resource = new ClassPathResource("data/data.json");
            Path path = Paths.get(resource.getURI());
            JSONArray jsonList = (JSONArray) new JSONParser().parse(new FileReader(path.toString()));
            for(Object o : jsonList){
                Test test = new Gson().fromJson(o.toString(), Test.class);
                testRepository.save(test);
            }
        }
    }
}
