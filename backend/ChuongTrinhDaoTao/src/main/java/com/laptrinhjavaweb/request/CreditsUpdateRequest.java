package com.laptrinhjavaweb.request;

import com.laptrinhjavaweb.response.CreditsResponse;

import lombok.Data;

@Data
public class CreditsUpdateRequest {
	private Long idCTDT;
	private CreditsResponse data;
}
