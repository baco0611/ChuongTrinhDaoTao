package com.laptrinhjavaweb.response;

import lombok.Data;

@Data
public class ProgramLearningOutComesGetResponse {
	private Long id;
	private String symbol;
	private String content;
	private String type;
	private String typeDetail;
	private int competency;
	private Long programId;
}
