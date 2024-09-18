package com.laptrinhjavaweb.response;

import java.util.List;

import com.laptrinhjavaweb.dto.ProgramLearningOutComesDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateProgramLearningOutComesReponse {
	private List<ProgramLearningOutComesDTO> data;
    private int status;
}
