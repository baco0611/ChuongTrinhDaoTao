package com.laptrinhjavaweb.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.EducationProgramConverter;
import com.laptrinhjavaweb.dto.EducationProgramDTO;
import com.laptrinhjavaweb.dto.PageInformation;
import com.laptrinhjavaweb.entity.EducationProgramEntity;
import com.laptrinhjavaweb.repository.EducationProgramRepository;
import com.laptrinhjavaweb.response.SearchProgramResponse;
import com.laptrinhjavaweb.service.IEducationProgramService;

@Service
public class TrainingProgramService implements IEducationProgramService {

	@Autowired
	private EducationProgramRepository trainingProgramRepository;

	@Autowired
	private EducationProgramConverter trainingProgramConverter;

	@Override
	public EducationProgramDTO findbyIdProgram(Long programId) throws Exception {
		EducationProgramEntity trainingProgramEntity = trainingProgramRepository.findByProgramId(programId);
		if (trainingProgramEntity == null) {
			return null;
		}
		EducationProgramDTO chuongTrinhDaoTaoDTO = trainingProgramConverter.toDTO(trainingProgramEntity);
		return chuongTrinhDaoTaoDTO;
	}

	@Override
	public EducationProgramDTO save(EducationProgramDTO ctdtDTO) throws Exception {
		EducationProgramEntity ctdtEntity = trainingProgramRepository.save(trainingProgramConverter.toEntity(ctdtDTO));
		return trainingProgramConverter.toDTO(ctdtEntity);
	}

	@Override
	public List<EducationProgramDTO> findAll() {
		List<EducationProgramDTO> lstDTO = new ArrayList<EducationProgramDTO>();
		List<EducationProgramEntity> lstEntity = trainingProgramRepository.findAll();
		for (EducationProgramEntity trainingProgramEntity : lstEntity) {
			EducationProgramDTO dto = new EducationProgramDTO();
			dto = trainingProgramConverter.toDTO(trainingProgramEntity);
			lstDTO.add(dto);
		}
		return lstDTO;
	}

	public SearchProgramResponse searchPrograms(String keyword, String department, int pageSize, int pageOrder) {
        PageRequest pageRequest = PageRequest.of(pageOrder - 1, pageSize);
        Page<EducationProgramEntity> programPage = trainingProgramRepository.searchPrograms(keyword, department, pageRequest);

        SearchProgramResponse responseWrapper = SearchProgramResponse.builder()
                .data(programPage.getContent().stream()
                        .map(trainingProgramConverter::convertToDTO)
                        .collect(Collectors.toList()))
                		.pageInformation(new PageInformation(
                        programPage.getNumberOfElements(),
                        pageSize,
                        programPage.getPageable().getOffset(),
                        programPage.isFirst(),
                        programPage.isLast(),
                        pageOrder,
                        programPage.getTotalPages(),
                        (int) programPage.getTotalElements()
                ))
                .status(200)
                .build();

        return responseWrapper;
    }

}
