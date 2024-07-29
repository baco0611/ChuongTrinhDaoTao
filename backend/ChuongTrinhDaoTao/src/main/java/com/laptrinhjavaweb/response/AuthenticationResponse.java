package com.laptrinhjavaweb.response;

import com.laptrinhjavaweb.request.LecturersResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private UserResponse user;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserResponse {
        private LecturersResponse data;
        private String token;
        private int status;
    }
}
