package com.laptrinhjavaweb.response;

import java.util.List;
import com.laptrinhjavaweb.dto.LecturersDTO;
import com.laptrinhjavaweb.dto.PageInformation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ListLecturersResponse {
	private List<LecturersDTO> data;
	private PageInformation pageInformation;
	private int status;
}
