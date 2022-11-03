package com.project.cs.ranking.controller;

import com.project.cs.ranking.dto.RankingResponse;
import com.project.cs.ranking.service.RankingService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/rankings")
public class RankingController {
    private final RankingService rankingService;

    @ApiOperation("랭킹 조회")
    @GetMapping
    public ResponseEntity<List<RankingResponse>> getRankings() {
        return ResponseEntity.ok(rankingService.getRankings());
    }
}
