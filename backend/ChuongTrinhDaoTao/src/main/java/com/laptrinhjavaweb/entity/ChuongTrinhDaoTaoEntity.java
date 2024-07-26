package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;

import lombok.Data;

@Entity
@Table(name = "ChuongTrinhDaoTao")
@Data

public class ChuongTrinhDaoTaoEntity {
	
	@Column(nullable = true, columnDefinition = "INTEGER DEFAULT 1")
    private Integer stt;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idChuongTrinh;

	@Column(unique = true)
	private String maChuongTrinhDaoTao;

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
	private Integer thoiGianDaoTao;

	@Column
	private String loaiHinhDaoTao;

	@Column
	private Integer soTinChiYeuCauTichLuy;

	@Column(columnDefinition = "TEXT")
	private String dieuKienTotNghiep;

	@Column(length = 50)
	private String vanBangTotNghiep;

	@Column(columnDefinition = "TEXT")
	private String viTriViecLamSauTotNghiep;

	@Column(columnDefinition = "TEXT")
	private String khaNangNangCaoTrinhDo;

	@Column(columnDefinition = "TEXT")
	private String chuongTrinhThamKhao;

	@Column(columnDefinition = "TEXT")
	private String mucTieuTongQuat;

	@Column
	private String nguoiPhuTrach;

	@Column
	private Integer buocHienTai;

	@Column
	private Integer trangThai;

	@Column
	private Integer khoiDaiCuong;

	@Column
	private Integer khoiCoSoNganh;

	@Column
	private Integer khoiNganh;

	@Column
	private Integer khoiBoTro;

	@Column
	private Integer khoiThucTap;

	@Column
	private Integer khoiDoAnKhoaLuan;

	@Column
	private Integer khoiChuyenNganh;
	
	@Temporal(TemporalType.DATE) // Annotation @Temporal được đặt trên trường thời gian
    @Column(name = "created_at", nullable = true, updatable = false)
    private Date createdAt;

	@Temporal(TemporalType.DATE) // Annotation @Temporal được đặt trên trường thời gian
    @Column(name = "updated_at", nullable = true)
    private Date updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

	@OneToMany(mappedBy = "idChuongTrinh")
	private List<ChuyenNganhDaoTaoEntity> lstChuyenNganh = new ArrayList<ChuyenNganhDaoTaoEntity>();

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
