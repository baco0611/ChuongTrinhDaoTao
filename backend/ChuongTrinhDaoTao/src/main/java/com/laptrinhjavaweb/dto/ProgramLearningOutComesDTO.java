package com.laptrinhjavaweb.dto;

import lombok.Data;

@Data
public class ProgramLearningOutComesDTO {
	private Long id;
	private String symbol;
	private String content;
	private String type;
	private Long programId;
}
