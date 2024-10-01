package com.laptrinhjavaweb.request;

import lombok.Data;

@Data
public class ProgramLearningOutComesUpdateRequest {
	private Long id;
    private String content;
    private int competency;
    private String symbol;
}
