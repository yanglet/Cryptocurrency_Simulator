package com.project.cs.test.repository;

import com.project.cs.test.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface TestRepository extends JpaRepository<Test, Long>, TestRepositoryCustom {
}
