package com.project.cs.test.repository;

import com.project.cs.test.entity.Test;

public interface TestRepositoryCustom {
    Test findByTime(String time);
}
