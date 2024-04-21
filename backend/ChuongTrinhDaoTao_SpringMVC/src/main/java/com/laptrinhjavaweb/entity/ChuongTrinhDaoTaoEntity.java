package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.*;

@Entity
@Table(name = "chuongTrinhDaoTao")
@Data

public class ChuongTrinhDaoTaoEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idChuongTrinh;

	@Column(length = 50)
	private String phienBan;
	
	@Column
	private String tenTiengViet;
	
	@Column
	private String tenTiengAnh;
	
	@Column(length = 50)
	private String trinhDoDaoTao;
	
	@Column(length = 50)
	private String maNganhDaoTao;
	
	@Column(length = 500)
	private String tenNganhDaoTao;
	
	@Column
	private String khoaQuanLyChuongTrinh;
	
	@Column(length = 50)
	private String doiTuongTuyenSinh;
	
	@Column
	private int thoiGianDaoTao;
	
	@Column
	private String loaiHinhDaoTao;
	
	@Column
	private int soTinChiYeuCauTichLuy;

	@Column(columnDefinition = "TEXT")
	private String dieuKienTotNghiep;
	
	@Column(length = 50)
	private String vanBangTotNghiep;
	
	@Column(columnDefinition = "TEXT")
	private String viTriViecLamSauTotNghiep;
	
	@Column(columnDefinition = "TEXT")
	private String khaNangNangCaoTrinhDo;
	
	@Column(columnDefinition = "TEXT")
	private String chuongTrinhThamkhao;
	
	@Column(columnDefinition = "TEXT")
	private String mucTieuTongQuat;
	
	@Column
	private String nguoiTao;
	
	@CreationTimestamp
	private Date ngayTao;
	
	@CreationTimestamp
	private Date ngayThayDoi;
	
	@Column
	private int buocHienTao;
	
	@Column
	private int trangThai;
	
	@OneToMany(mappedBy = "idChuongTrinh")
	private List<ChuyenNganhDaoTaoEntity> lstChuyenNganh= new ArrayList<ChuyenNganhDaoTaoEntity>();

	@OneToMany(mappedBy = "idChuongTrinh")
	private List<MucTieuCuTheEntity> lstMucTieu = new ArrayList<MucTieuCuTheEntity>(); 
	
	@OneToMany(mappedBy = "idChuongTrinh")
	private List<ChuanDauRaEntity> lstChuanDauRa = new ArrayList<ChuanDauRaEntity>(); 

	@OneToMany(mappedBy = "idChuongTrinh")
	private List<MaTran_ChuanDauRa_MucTieuEntity> lstChuanDauRaMucTieu = new ArrayList<MaTran_ChuanDauRa_MucTieuEntity>();

	@OneToMany(mappedBy = "idChuongTrinh")
	private List<ChuongTrinhChiTietEntity> lstChuongTrinhChiTiet = new ArrayList<ChuongTrinhChiTietEntity>();

	@OneToMany(mappedBy = "idChuongTrinh")
	private List<MaTran_HocPhan_ChuanDauRaEntity> lstHocPhanChuanDauRa = new ArrayList<MaTran_HocPhan_ChuanDauRaEntity>();

	@OneToMany(mappedBy = "idChuongTrinh")
	private List<MaTran_ChungChi_ChuanDauRaEntity> lstChungChiChuanDauRa = new ArrayList<MaTran_ChungChi_ChuanDauRaEntity>();
}
