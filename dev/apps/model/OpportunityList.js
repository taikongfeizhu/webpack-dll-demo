import { Record } from 'immutable';

export default class OpportunityList extends Record({
  key: null,
  id: null,
  library_id: null,
  sales_id: null,
  private: null,
  name: null,
  site: null,
  address: null,
  province: null,
  city: null,
  contacts: null,
  phone: null,
  second_phone: null,
  industry: null,
  small_industry: null,
  title: null,
  link: null,
  post_time: null,
  source: null,
  source_name: null,
  register_code: null,
  register_time: null,
  register_capital: null,
  mail: null,
  qq: null,
  product_name: null,
  status: null,
  status_name: null,
  remark: null,
  creator_id: null,
  create_time: null
}) {

}
OpportunityList.fromJS = (val) => {
  const opportunityListData = val || [];
  const params = {};
  const output = [];

  opportunityListData.forEach(opportunity => {
    params.key = opportunity.id.toString();
    params.id = opportunity.id;
    params.library_id = opportunity.library_id;
    params.sales_id = opportunity.sales_id;
    params.private = opportunity.private;
    params.name = opportunity.name;
    params.site = opportunity.site;
    params.address = opportunity.address;
    params.province = opportunity.province;
    params.city = opportunity.city;
    params.contacts = opportunity.contacts;
    params.phone = opportunity.phone;
    params.second_phone = opportunity.second_phone;
    params.industry = opportunity.industry;
    params.small_industry = opportunity.small_industry;
    params.title = opportunity.title;
    params.link = opportunity.link;
    params.post_time = opportunity.post_time;
    params.source = opportunity.source;
    params.source_name = opportunity.source_name;
    params.register_code = opportunity.register_code;
    params.register_time = opportunity.register_time;
    params.register_capital = opportunity.register_capital;
    params.mail = opportunity.mail;
    params.qq = opportunity.qq;
    params.product_name = opportunity.product_name;
    params.status = opportunity.status;
    params.status_name = opportunity.status_name;
    params.remark = opportunity.remark;
    params.creator_id = opportunity.creator_id;
    params.create_time = opportunity.create_time;

    output.push(new OpportunityList(params));
  });
  return output;
};
