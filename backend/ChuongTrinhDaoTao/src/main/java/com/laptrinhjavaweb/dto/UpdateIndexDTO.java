package com.laptrinhjavaweb.dto;

import lombok.Data;

@Data
public class UpdateIndexDTO {
	private Long programId;
    private Long courseOutlineId;
    private Integer index;
}
