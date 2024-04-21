package com.laptrinhjavaweb.controller;

import org.springframework.web.bind.annotation.RestController;


@RestController
public class UserController {


//	 @RequestMapping(value = "/dangki", method = RequestMethod.POST )
//	 public ModelAndView dangki(@ModelAttribute UserEntity userDto, HttpServletRequest request, HttpServletResponse response) { 
//		try {
//			//client gui len server bang utf-8
//			request.setCharacterEncoding("utf-8");
//			// server gui len client bang utf-8
//			response.setCharacterEncoding("utf-8");
//			ModelAndView registerView =new ModelAndView("register");
//			String email=userDto.getEmail();
//			String fullName =userDto.getFull_name();
//			String phone=userDto.getPhone();
//			String address=userDto.getAddress();
//			String dateView= request.getParameter("dateView");
//			SimpleDateFormat f= new SimpleDateFormat("yyyy-MM-dd");
//			String password=userDto.getPassword();
//			Boolean permission = userDto.isPermission();
//			String repeat_password= request.getParameter("repeat_password");
//			registerBo reBo= new registerBo();
//			long millis=System.currentTimeMillis(); 
//			java.util.Date today=new java.util.Date(millis);
//			
//			String message="", message_email="", message_fullName="", mess_phone="", message_address="", message_dateOfBirth="", message_password="",message_repeat_password="";
//			//Nếu nhập đầy đủ các trường...
//			if (!email.equals("") && !fullName.equals("") && !phone.equals("") && !address.equals("") && !dateView.equals("") && !password.equals("") && !repeat_password.equals("")) {
//				Date dateOfBirth=f.parse(dateView);
//				Boolean check=true;
//				//Kiểm tra nhập lại mật khẩu
//				if (repeat_password.equals(password)) {
//					//Kiểm tra tính hợp lệ của ngày tháng năm sinh
//					if (dateOfBirth.compareTo(today)>=0) {
//						message_dateOfBirth="Ngày sinh không hợp lệ!";
//						request.setAttribute("message_dateOfBirth", message_dateOfBirth);
//						check=false;
//					}
//					//Kiểm tra định dạng email
//					String regex_email = "\\b[A-Za-z0-9._%+-]+@gmail\\.com\\b";
//					Pattern pattern_email = Pattern.compile(regex_email);
//					Matcher matcher_email = pattern_email.matcher(email);
//					if (matcher_email.find() == false) {
//						message_email = "Vui lòng nhập đúng định dạng email!";
//						request.setAttribute("message_email", message_email);
//						check=false;
//					}
//					//Kiểm tra định dạng số điện thoại
//					String regex_phone = "^(84|0)\\d{9,10}$";
//					Pattern pattern_phone = Pattern.compile(regex_phone);
//					Matcher matcher_phone = pattern_phone.matcher(phone);
//					if (matcher_phone.find() == false) {
//						mess_phone = "Vui lòng nhập đúng định dạng số điện thoại!";
//						request.setAttribute("mess_phone", mess_phone);
//						check=false;
//					}
//					//Nếu định dạng email và sđt đúng thì kiểm tra tiếp..
//					if (check==true ) {
//						//Kiểm tra người dùng đã đăng kí chưa
//						if (reBo.ktDangKi(email)==null) {
//							reBo.dangKi(email, fullName, address, dateOfBirth, phone, password, permission);
//							message="Đăng kí thành công!";
//							request.setAttribute("message", message);
//				
//						}
//						else {
//							message="Tài khoản đã được đăng kí!";
//							request.setAttribute("message", message);
//						
//						}
//					}
//				}
//				else {//Mật khẩu nhập lại không đúng
//					message_repeat_password= "Mật khẩu nhập lại không đúng";
//					request.setAttribute("message_repeat_password", message_repeat_password);
//				}
//				return registerView;
//			}
//			else {
//				if (email.equals("")) {
//					message_email="Email không được bỏ trống!";
//					request.setAttribute("message_email", message_email);
//				}
//				if (fullName.equals("")) {
//					message_fullName="Họ và tên không được bỏ trống!";
//					request.setAttribute("message_fullName", message_fullName);
//				}
//				if (address.equals("")) {
//					message_address="Địa chỉ không được bỏ trống!";
//					request.setAttribute("message_address", message_address);
//				}
//				if (dateView.equals("")) {
//					message_dateOfBirth="Ngày sinh không được bỏ trống!";
//					request.setAttribute("message_dateOfBirth", message_dateOfBirth);
//				}
//				if (password.equals("")) {
//					message_password="Mật khẩu không được bỏ trống!";
//					request.setAttribute("message_password", message_password);
//				}
//				if (mess_phone.equals("")) {
//					mess_phone="Số điện thoại không được bỏ trống!";
//					request.setAttribute("mess_phone", mess_phone);
//				}
//				if (repeat_password.equals("") && !password.equals("")) {
//					message_repeat_password="Nhập lại mật khẩu!";
//					request.setAttribute("message_repeat_password", message_repeat_password);
//				}
//			}
//			
//			return registerView;
//		} catch (Exception e) {
//			e.printStackTrace();
//			System.out.println(e.getMessage());
//			ModelAndView registerView =new ModelAndView("register");
//			return registerView;
//		} 
//		
//	 }
//	 
	 
	 
}
