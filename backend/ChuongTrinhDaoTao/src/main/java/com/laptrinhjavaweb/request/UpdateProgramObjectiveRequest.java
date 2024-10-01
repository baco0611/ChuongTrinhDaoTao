package com.laptrinhjavaweb.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProgramObjectiveRequest {
	private Long id;
    private String content;
    private String symbol;
}
