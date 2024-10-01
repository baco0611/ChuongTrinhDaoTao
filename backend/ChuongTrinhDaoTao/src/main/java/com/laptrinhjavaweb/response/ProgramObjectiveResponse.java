package com.laptrinhjavaweb.response;

import java.util.List;

import com.laptrinhjavaweb.dto.ProgramObjectiveDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProgramObjectiveResponse {
	private List<ProgramObjectiveDTO> data;
	private int status;
}
