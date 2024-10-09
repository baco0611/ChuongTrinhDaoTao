package com.laptrinhjavaweb.request;

import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LecturerRequestDTO {
	@NotBlank(message = "Mã giảng viên không được để trống")
    @Size(max = 10, message = "Mã giảng viên không được dài quá 10 ký tự")
    private String lecturerCode;

    @NotBlank(message = "Vui lòng điền họ đệm")
    @Size(max = 255, message = "Họ đệm không được dài quá 255 ký tự")
    private String lastName;

    @NotBlank(message = "Vui lòng điền tên")
    @Size(max = 255, message = "Tên không được dài quá 255 ký tự")
    private String firstName;

    @Email(message = "Email không hợp lệ")
    @NotBlank(message = "Email không được để trống")
    private String email;

    @NotBlank(message = "Mã phòng ban không được để trống")
    private String departmentCode;
    
    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;

    private List<String> roles;
}
