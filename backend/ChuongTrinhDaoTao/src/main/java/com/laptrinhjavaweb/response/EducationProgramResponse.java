package com.laptrinhjavaweb.response;

import lombok.Data;

@Data
public class EducationProgramResponse {
	private String programCode;
	private String programName;
	private String fieldName;
	private String status;
	private String programId;
	private String responsiblePerson;
	private String responsiblePersonCode;
	private String department;
	private String createdAt;
	private String updatedAt;
}
