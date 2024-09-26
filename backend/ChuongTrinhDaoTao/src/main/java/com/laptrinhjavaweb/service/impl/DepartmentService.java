package com.laptrinhjavaweb.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.DepartmentConverter;
import com.laptrinhjavaweb.dto.DepartmentDTO;
import com.laptrinhjavaweb.dto.DepartmentDetailDTO;
import com.laptrinhjavaweb.dto.LecturerOfDepartmentDTO;
import com.laptrinhjavaweb.entity.DepartmentEntity;
import com.laptrinhjavaweb.entity.LecturersEntity;
import com.laptrinhjavaweb.repository.DepartmentRepository;
import com.laptrinhjavaweb.repository.LecturersRepository;
import com.laptrinhjavaweb.response.ListLecturersOfDepartmentResponse;
import com.laptrinhjavaweb.service.IDepartmentService;

@Service
public class DepartmentService implements IDepartmentService {

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private DepartmentConverter departmentConverter;
	
	@Autowired
	private LecturersRepository lecturersRepository;

	@Override
	public List<DepartmentDTO> findAll() {
		List<DepartmentDTO> lstDTO = new ArrayList<DepartmentDTO>();
		List<DepartmentEntity> lstEntity = departmentRepository.findAll();
		for (DepartmentEntity departmentEntity : lstEntity) {
			lstDTO.add(departmentConverter.toDTO(departmentEntity));
		}
		return lstDTO;
	}

	public DepartmentEntity getDepartmentFromSomewhere(Long departmentId) {
		return departmentRepository.findById(departmentId)
				.orElseThrow(() -> new RuntimeException("Department not found"));
	}

	@Override
	public ListLecturersOfDepartmentResponse getDepartmentDetails() {
	    List<DepartmentEntity> departments = departmentRepository.findAll();
	    List<DepartmentDetailDTO> departmentDTOs = new ArrayList<>();

	    for (DepartmentEntity department : departments) {
	        // Tìm giảng viên quản lý khoa
	        LecturersEntity responsibleLecturer = null;
	        for (LecturersEntity lecturer : department.getLecturers()) {
	            if (lecturer.getDepartmentManager()) {
	                responsibleLecturer = lecturer;
	                break;
	            }
	        }

	        // Map danh sách giảng viên sang DTO
	        List<LecturerOfDepartmentDTO> lecturerList = new ArrayList<>();
	        for (LecturersEntity lecturer : department.getLecturers()) {
	            LecturerOfDepartmentDTO lecturerDTO = new LecturerOfDepartmentDTO();
	            lecturerDTO.setId(lecturer.getLecturersId());
	            lecturerDTO.setLecturerCode(lecturer.getLecturersCode());
	            lecturerDTO.setLecturerName(lecturer.getLastName() + " " + lecturer.getFirstName());
	            lecturerList.add(lecturerDTO);
	        }

	        // Tạo DTO cho Department
	        DepartmentDetailDTO departmentDTO = new DepartmentDetailDTO();
	        departmentDTO.setDepartmentId(department.getDepartmentId());
	        departmentDTO.setDepartmentName(department.getDepartmentName());

	        // Đặt giảng viên quản lý khoa vào DTO
	        if (responsibleLecturer != null) {
	            LecturerOfDepartmentDTO responsibleLecturerDTO = new LecturerOfDepartmentDTO();
	            responsibleLecturerDTO.setId(responsibleLecturer.getLecturersId());
	            responsibleLecturerDTO.setLecturerCode(responsibleLecturer.getLecturersCode());
	            responsibleLecturerDTO.setLecturerName(responsibleLecturer.getFirstName() + " " + responsibleLecturer.getLastName());
	            departmentDTO.setResponsibleLecturer(responsibleLecturerDTO);
	        } else {
	            departmentDTO.setResponsibleLecturer(null);
	        }

	        departmentDTO.setLecturerList(lecturerList);
	        departmentDTOs.add(departmentDTO);
	    }

	    // Tạo response trả về
	    ListLecturersOfDepartmentResponse response = new ListLecturersOfDepartmentResponse();
	    response.setData(departmentDTOs);
	    response.setStatus(200);

	    return response;
	}
	
	@Override
    public void updateDepartmentManager(Long departmentId, Long lecturerId) {
        // Lấy department từ database
        DepartmentEntity department = departmentRepository.findById(departmentId)
            .orElseThrow(() -> new RuntimeException("Department not found"));

        // Xóa quyền quản lý hiện tại
        for (LecturersEntity lecturer : department.getLecturers()) {
            lecturer.setDepartmentManager(false);
            lecturersRepository.save(lecturer);
        }

        if (lecturerId != null) {
            // Cập nhật quyền quản lý cho lecturer
            LecturersEntity lecturer = lecturersRepository.findById(lecturerId)
                .orElseThrow(() -> new RuntimeException("Lecturer not found"));

            lecturer.setDepartmentManager(true);
            lecturersRepository.save(lecturer);
        }
    }

}
