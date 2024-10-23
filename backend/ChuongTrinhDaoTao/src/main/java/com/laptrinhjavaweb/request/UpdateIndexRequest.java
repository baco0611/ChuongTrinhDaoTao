package com.laptrinhjavaweb.request;

import java.util.List;

import com.laptrinhjavaweb.dto.UpdateIndexDTO;

import lombok.Data;

@Data
public class UpdateIndexRequest {
	private List<UpdateIndexDTO> data;
}
