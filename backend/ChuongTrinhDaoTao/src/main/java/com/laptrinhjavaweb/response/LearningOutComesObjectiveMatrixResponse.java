package com.laptrinhjavaweb.response;

import java.util.List;

import com.laptrinhjavaweb.dto.LearningOutComesObjectiveMatrixDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LearningOutComesObjectiveMatrixResponse {
    private List<LearningOutComesObjectiveMatrixDTO> data;
    private int status;
}
