package com.laptrinhjavaweb.response;

import java.util.List;

import com.laptrinhjavaweb.dto.ProgramLearningOutcomeDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProgramLearningOutComesResponse {
	private List<ProgramLearningOutcomeDTO> data;
	private int status;
}
