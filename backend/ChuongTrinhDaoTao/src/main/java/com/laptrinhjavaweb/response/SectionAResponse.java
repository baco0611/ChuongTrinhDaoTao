package com.laptrinhjavaweb.response;

import lombok.Data;

@Data
public class SectionAResponse {
	private TrainingProgramResponse data;
	private int status;
}
