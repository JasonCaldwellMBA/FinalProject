package entities;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
@Entity
public class Request {
	
	//===========================Fields====================================//
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id; 
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="vehicle_id")
	private Vehicle vehicle;
	
	private boolean completed;
	
	private boolean active;
	
	private String img;
	
//	@OneToOne(mappedBy="request")
//	@JoinColumn(name="")
//	private PartRequest partRequest;
	
	private String description; 
	
	@Column(name="post_date")
	private Timestamp postDate; 
	
	@Column(name="expire_date")
	private Timestamp expireDate; 
	
	@Column(name="complete_date")
	private Timestamp completeDate; 
	
	private double estimate;
	
	//===========================Getters and Setters==========================//

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

//	public PartRequest getPartRequest() {
//		return partRequest;
//	}
//
//	public void setPartRequest(PartRequest partRequest) {
//		this.partRequest = partRequest;
//	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Timestamp getPostDate() {
		return postDate;
	}

	public void setPostDate(Timestamp postDate) {
		this.postDate = postDate;
	}

	public Timestamp getExpireDate() {
		return expireDate;
	}

	public void setExpireDate(Timestamp expireDate) {
		this.expireDate = expireDate;
	}

	public Timestamp getCompleteDate() {
		return completeDate;
	}

	public void setCompleteDate(Timestamp completeDate) {
		this.completeDate = completeDate;
	}

	public double getEstimate() {
		return estimate;
	}

	public void setEstimate(double estimate) {
		this.estimate = estimate;
	}
	
	//====================================toString=======================================//

//	@Override
//	public String toString() {
//		return "Request [id=" + id + ", user=" + user + ", vehicle=" + vehicle + ", completed=" + completed
//				+ ", active=" + active + ", img=" + img + ", partRequest=" + partRequest + ", description="
//				+ description + ", postDate=" + postDate + ", expireDate=" + expireDate + ", completeDate="
//				+ completeDate + ", estimate=" + estimate + "]";
//	} 
	
	
}
