package com.laptrinhjavaweb.response;

import java.util.List;

import com.laptrinhjavaweb.dto.PageInformation;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SearchLecturersResponse {
	private List<LecturersResponse> data;
	private PageInformation pageInformation;
	private int status;
}
