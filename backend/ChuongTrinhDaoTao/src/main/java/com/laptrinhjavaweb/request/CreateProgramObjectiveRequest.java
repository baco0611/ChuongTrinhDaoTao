package com.laptrinhjavaweb.request;

import lombok.Data;

@Data
public class CreateProgramObjectiveRequest {
	private Long programId;
    private String symbol;
    private String type;
}
