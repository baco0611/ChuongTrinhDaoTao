package com.laptrinhjavaweb.dto;

import lombok.Data;

@Data
public class FieldOfStudyDTO {
	private Long id;
    private String fieldCode;
    private String fieldName;
    private String department;
}
