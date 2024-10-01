package com.laptrinhjavaweb.response;

import com.laptrinhjavaweb.dto.LecturersDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefreshTokenResponse {
	private LecturersDTO data;
    private String token;
    private int status;
}
