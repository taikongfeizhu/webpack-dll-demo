/*
untracked = 1
tracking = 2
unhold = 3
dealed = 4

{
    untracked: u'未跟进',
    tracking: u'跟进中',
    unhold: u'未分配/已释放商机',
    dealed: u'去开户'
}
 */
export const statusConfig = {
  untracked: '1',
  tracking: '2',
  unhold: '3',
  dealed: '4'
};

var i;
var children;
var j;
var options = [];
var cityUtil = window.cityUtil;

for (i in cityUtil.province) {
  options.push({
    value: cityUtil.province[i].name,
    label: cityUtil.province[i].name,
    id: cityUtil.province[i].id
  });

  if (!cityUtil.isMunicipality(cityUtil.province[i].id)) {
    options[i].children = [];
    children = cityUtil.province[i].children;
    for (j in children) {
      options[i].children.push({
        value: cityUtil.getCityNameById(children[j]),
        label: cityUtil.getCityNameById(children[j]),
        id: children[j]
      });
    }
  }
}
export const regionCityOptions = options;
