package com.laptrinhjavaweb.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.LecturersConverter;
import com.laptrinhjavaweb.repository.LecturersRepository;

@Service
public class LecturerService {
	@Autowired
	private LecturersRepository lecturersRepository;

	@Autowired
	private LecturersConverter lecturersConverter; // Ensure this converter is updated to match new DTO

//	public SearchLecturersResponse searchLecturers(String keyword, String department, int pageSize, int pageOrder) {
//		// Create PageRequest with page number and size
//		PageRequest pageRequest = PageRequest.of(pageOrder - 1, pageSize);
//
//		// Call the repository method to get paginated results
//		Page<LecturersEntity> lecturersPage = lecturersRepository.findLecturers(keyword, department, pageRequest);
//
//		// Create a response object with data and pagination information
//		SearchLecturersResponse responseWrapper = SearchLecturersResponse.builder()
//				.data(lecturersPage.getContent().stream().map(this:) // Use the updated conversion method
//						.collect(Collectors.toList()))
//				.pageInformation(new PageInformation(lecturersPage.getNumberOfElements(), pageSize,
//						lecturersPage.getPageable().getOffset(), lecturersPage.isFirst(), lecturersPage.isLast(),
//						pageOrder, lecturersPage.getTotalPages(), lecturersPage.getTotalElements()))
//				.status(200).build();
//
//		return responseWrapper;
//	}
}
