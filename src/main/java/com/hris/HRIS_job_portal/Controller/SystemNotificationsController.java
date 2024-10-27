package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.Model.SystemNotificationsModel;
import com.hris.HRIS_job_portal.Service.SystemNotificationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/system-notifications")
public class SystemNotificationsController {
    @Autowired
    private SystemNotificationsService notificationService;

    @GetMapping("/active")
    public List<SystemNotificationsModel> getActiveNotifications() {
        return notificationService.getActiveNotifications();
    }

    @PostMapping("/add")
    public SystemNotificationsModel createNotification(@RequestBody SystemNotificationsModel notification) {
        return notificationService.createNotification(notification);
    }

    @PutMapping("/update/{id}")
    public SystemNotificationsModel updateNotification(@PathVariable String id, @RequestBody SystemNotificationsModel notification) {
        notification.setId(id);
        return notificationService.updateNotification(notification);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteNotification(@PathVariable String id) {
        notificationService.deleteNotification(id);
    }
}
