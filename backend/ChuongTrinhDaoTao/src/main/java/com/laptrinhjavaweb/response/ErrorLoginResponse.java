package com.laptrinhjavaweb.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ErrorLoginResponse {
    private String lecturersCodeError;
    private String passwordError;
}
