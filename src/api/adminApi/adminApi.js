import { axiosClient } from '../axiosClient';

const adminApi = {
  getEmployeeById(id) {
    const url = `/admin/employees/${id}`;
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  getAllEmployees() {
    const url = '/admin/employees';
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  insertEmployee(employee) {
    const url = '/admin/employees';
    return axiosClient.post(url, employee, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  updateEmployee(id, employee) {
    const url = `/admin/employees/${id}`;
    return axiosClient.put(url, employee, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  deleteEmployee(id) {
    const url = `/admin/employees/${id}`;
    return axiosClient.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  getAllUsers() {
    const url = '/admin/users';
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  getAllRoles() {
    const url = '/admin/roles';
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  getPermissionByRoleId(id) {
    const url = `/admin//permissions/${id}`;
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  getPermissionsByUserId(id) {
    const url = `/admin/users/${id}/permissions`;
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  updatePermissionByRoleId(id, data, isApply) {
    const url = `/admin/permissions/${id}?applying=${isApply}`;
    return axiosClient.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  updatePermissionsByUserId(id, data) {
    const url = `/admin/users/${id}/permissions`;
    return axiosClient.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  getRevenueByDay() {
    const url = `/admin/revenues/day`;
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  getRevenueByMonth() {
    const url = `/admin/revenues/month`;
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  getRevenueByQuater() {
    const url = `/admin/revenues/quater`;
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  getRevenueByYear() {
    const url = `/admin/revenues/year`;
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },
};

export default adminApi;
