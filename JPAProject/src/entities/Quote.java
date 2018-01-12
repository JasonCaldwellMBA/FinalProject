package entities;
//test
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "quote")
public class Quote {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	@ManyToOne
	@JoinColumn(name = "request_id")
	private Request request;
	
	@ManyToOne
	@JoinColumn(name = "business_id")
	private Business business; 	
	
	@Column(name = "description")
	private String description; 
	
	@Column(name = "post_date")
	private Timestamp postDate; 
	
	@Column(name = "expire_date")
	private Timestamp expireDate; 
	
	@Column(name = "complete_date")
	private Timestamp completeDate; 
	
	@Column(name = "estimate")
	private double estimate;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Request getRequest() {
		return request;
	}
	public void setRequest(Request request) {
		this.request = request;
	}
	public Business getBusiness() {
		return business;
	}
	public void setBusiness(Business business) {
		this.business = business;
	}
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
	@Override
	public String toString() {
		return "Quote [id=" + id + ", request=" + request + ", description=" + description + ", postDate=" + postDate
				+ ", expireDate=" + expireDate + ", completeDate=" + completeDate + ", estimate=" + estimate + "]";
	}
	
}
