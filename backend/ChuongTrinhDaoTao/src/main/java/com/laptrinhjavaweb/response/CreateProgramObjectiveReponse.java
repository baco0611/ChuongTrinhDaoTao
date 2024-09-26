package com.laptrinhjavaweb.response;

import java.util.List;

import com.laptrinhjavaweb.dto.ProgramObjectiveDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateProgramObjectiveReponse {
	private List<ProgramObjectiveDTO> data;
    private int status;
}
