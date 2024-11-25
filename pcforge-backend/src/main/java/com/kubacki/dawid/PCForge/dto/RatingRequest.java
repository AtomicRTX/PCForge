package com.kubacki.dawid.PCForge.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class RatingRequest {
    private Double rate;

    public Double getRate() {
        return rate;
    }
}
