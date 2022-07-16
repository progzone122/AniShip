const url_coub = 'https://coub.com/api/v2'
let resp = ''
export async function hotCoubs (type, page) {
  resp = await fetch(url_coub + '/timeline/community/anime/' + type + '?per_page=10&page=' + page, {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'include'
  });
  return resp.json();
}
// https://coub.com/api/v2/timeline/community/anime/monthly?page=1
// daily, weekly, monthly
