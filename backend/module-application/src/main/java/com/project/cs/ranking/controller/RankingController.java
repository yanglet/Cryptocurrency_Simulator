package com.project.cs.ranking.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/ranks")
public class RankingController {
    // 수익률 순서대로 전체 조회 ( 오늘 )
    // 수익률 순서대로 전체 조회 ( 이번주 )
    // 수익률 순서대로 전체 조회 ( 이번달 )
}
