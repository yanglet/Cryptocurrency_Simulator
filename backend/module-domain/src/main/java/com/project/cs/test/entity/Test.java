package com.project.cs.test.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Test {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "test_id")
    private Long id;
    private String time;
    private BigDecimal price;

    @Builder
    public Test(BigDecimal price, String time) {
        this.price = price;
        this.time = time;
    }
}
