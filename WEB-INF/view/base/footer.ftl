   <#import "/base/spring.ftl" as spring/>      	
            <footer class="footer-nav">
                <div class="container fadeInUp contentAnimated" data-animation="true" data-animation-type="fadeInUp">
                    <div class="row">
                         <div class="col-sm-8 col-xs-6">
                            <ul  class="col-xs-6 col-sm-2 hidden-xs abouts">
                                <h4><@spring.message code="guanyuwomen"/></h4>
                                <li ><a href="${ctx}/news/aboutus<#if tokenId??>.do?categoryId=<#if locale == 'zh_CN'>61<#else>72</#if><#else>.do?categoryId=<#if locale == 'zh_CN'>61<#else>72</#if></#if>" ><@spring.message code="shiyongtiaokuan"/></a></li> 
                                <li ><a href="${ctx}/news/aboutus<#if tokenId??>.do?categoryId=<#if locale == 'zh_CN'>62<#else>73</#if><#else>.do?categoryId=<#if locale == 'zh_CN'>62<#else>73</#if></#if>" ><@spring.message code="yinsizhengce"/></a></li> 
                                <li ><a href="${ctx}/news/aboutus<#if tokenId??>.do?categoryId=<#if locale == 'zh_CN'>63<#else>74</#if><#else>.do?categoryId=<#if locale == 'zh_CN'>63<#else>74</#if></#if>" ><@spring.message code="lianxiwomen"/></a></li> 
                            </ul>
                            <ul  class="col-xs-6 col-sm-2 hidden-xs">
                                <h4><@spring.message code="xinwenzixun"/></h4>
                                <li ><a href="${ctx}/news/index/<#if locale == 'zh_CN'>4<#else>65</#if>
<#if tokenId??>.do?</#if>" ><@spring.message code="zuixindongtai"/></a></li> 
                                <li ><a href="${ctx}/news/index/<#if locale == 'zh_CN'>5<#else>64</#if>
<#if tokenId??>.do?</#if>" ><@spring.message code="xinwenzixun"/></a></li> 
                                <li ><a href="${ctx}/news/index/<#if locale == 'zh_CN'>6<#else>66</#if>
<#if tokenId??>.do?</#if>" ><@spring.message code="hangyedongtai"/></a></li>
                                <li ><a href="${ctx}/news/index/<#if locale == 'zh_CN'>7<#else>80</#if>
<#if tokenId??>.do?</#if>" ><@spring.message code="bizhongxinwen"/></a></li> 
                            </ul>
                              <ul  class="col-xs-6 col-sm-2 hidden-xs">
                                <h4><@spring.message code="Helpcenter"/></h4>
                                <li ><a href="${ctx}/news/help<#if tokenId??>.do?categoryId=<#if locale == 'zh_CN'>37<#else>68</#if><#else>.do?categoryId=<#if locale == 'zh_CN'>37<#else>68</#if></#if>" ><@spring.message code="xinshouzhiyin"/></a></li> 
                                <li ><a href="${ctx}/news/help<#if tokenId??>.do?categoryId=<#if locale == 'zh_CN'>38<#else>69</#if><#else>.do?categoryId=<#if locale == 'zh_CN'>38<#else>69</#if></#if>" ><@spring.message code="bizhongziliao"/></a></li> 
                                <li ><a href="${ctx}/news/help<#if tokenId??>.do?categoryId=<#if locale == 'zh_CN'>39<#else>70</#if><#else>.do?categoryId=<#if locale == 'zh_CN'>39<#else>70</#if></#if>" ><@spring.message code="changjianwenti"/></a></li> 
                                <li ><a href="${ctx}/news/help<#if tokenId??>.do?categoryId=<#if locale == 'zh_CN'>40<#else>71</#if><#else>.do?categoryId=<#if locale == 'zh_CN'>40<#else>71</#if></#if>" ><@spring.message code="falvwenjian"/></a></li> 
                            </ul>
                            
                 	 <ul class="col-xs-12 col-sm-6">
                                <h4><@spring.message code="lianxiwomen"/></h4>
                                <#if serviceEmail!=0 ><li><@spring.message code="kefurexian"/>: ${servicePhone!}</li></#if>
                                <#if serviceEmail!=0 ><li><@spring.message code="kefuyouxiang"/>: ${serviceEmail!}</li></#if>
                                <#if serviceQQ!=0 ><li>QQ: ${serviceQQ!}</li></#if>
                                <#if companyAdress!=0 ><li><@spring.message code="dizhi"/>: ${companyAdress!}</li></#if>
                                <#if siteCopyright!=0 ><li>${siteCopyright!}</li></#if>
                     </ul>

                       
                         </div>
                        <div class="col-sm-4 col-xs-6">
                          
                            <ul class="col-xs-12 text-left">
                                <h4 class="ui-logo-text"><@spring.message code="fengxiantishi"/></h4>
                                <li class="">
                                <@spring.message code="fengxiantishi_content"/>
                                </li>
                                <li class="secure-warn">
                                    <p><@spring.message code="jiaoyiyoufengxian"/>！</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
   <#if isProposal!=1>${write_proposal}</#if> 
