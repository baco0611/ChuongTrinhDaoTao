package com.laptrinhjavaweb.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProgramObjectiveDTO {
	private Long id;
    private String symbol;
    private String content;
    private String type;
    private Long programId;
}
