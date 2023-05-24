export const ApiService = {
    
    
    getIssues() {
        return fetch(`https://el-issue-tracker.herokuapp.com/api/issues`)
            .then((response) => response.json());
    },

    getIssue(id) {
        return fetch(`https://el-issue-tracker.herokuapp.com/api/issues/${id}`)
            .then((response) => response.json());
    }
}