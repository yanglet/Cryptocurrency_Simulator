package com.project.cs.ranking.repository;

import com.project.cs.ranking.entity.Ranking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RankingRepository extends JpaRepository<Ranking, Long> {
}
