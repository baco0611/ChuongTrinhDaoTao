package com.laptrinhjavaweb.input;

import com.laptrinhjavaweb.output.CreditsOutput;
import lombok.Data;

@Data
public class CreditsUpdateInput {
	private Long idCTDT;
	private CreditsOutput data;
}
