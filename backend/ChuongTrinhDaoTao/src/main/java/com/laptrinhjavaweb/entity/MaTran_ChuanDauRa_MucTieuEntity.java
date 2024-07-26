package com.laptrinhjavaweb.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="MaTranChuanDauRaMucTieu")
@Data
public class MaTran_ChuanDauRa_MucTieuEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idMaTran;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChuanDauRa")
	private ChuanDauRaEntity idChuanDauRa;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idMucTieu")
	private MucTieuCuTheEntity idMucTieu;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChuongTrinh")
	private ChuongTrinhDaoTaoEntity idChuongTrinh;
	
}
