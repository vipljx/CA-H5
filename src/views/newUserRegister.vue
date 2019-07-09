<template>
  <div class="passworld-login">
    
    <div class="login-line"></div>
    <div class="two-box">
      <div class="iphone-number">
        <img src="../assets/图层4.png" alt="">
        <div class="iphone-input">
          <van-cell-group>
            <van-field v-model="phone" placeholder="请输入手机号码" autosize @blur="checkIphoneNumber" maxlength="11"/>
          </van-cell-group>
        </div>
      </div>
      <div class="login-register-icon">
        <img src="../assets/图层6.png" alt="">
        <div class="ipone-register-input">
          <van-cell-group>
            <van-field v-model="registerNumber" placeholder="请输入验证码" autosize maxlength="6"/>
          </van-cell-group>
        </div>
        <div class="register-number">
          <van-button :disabled="disabled" type="primary" @click="checkLoginButton">
            {{registercode}}
          </van-button>
        </div>
      </div>
      <div class="login-passworld-icon">
        <img src="../assets/形状2.png" alt="">
        <div class="iphone-passworld-input">
          <van-cell-group>
            <van-field v-model="password" placeholder="请输入登录密码" autosize type="password" maxlength="18" minlength="6"/>
          </van-cell-group>
        </div>
      </div>
      <div class="login-passworld-icon">
        <img src="../assets/形状2.png" alt="">
        <div class="iphone-passworld-input">
          <van-cell-group> 
            <van-field v-model="confrimpassword" placeholder="请确认登录密码" autosize type="password" maxlength="18" minlength="6"/>
          </van-cell-group>
        </div>
      </div>
      <div class="user-indication">
        <van-checkbox v-model="checked" shape="square" icon-size="15px">

        </van-checkbox>
        <span class="user-agreement-one">
          已阅读并同意
        </span>
        <span class="user-agreement" @click="rightPop">
          《用户使用协议》
        </span>
      </div>
      <div class="login-button" @click='showIphoneMessage'>
        注册
      </div>
      <div class="account-number-login">
        <router-link to="/">账号登录</router-link>
      </div>
    </div>
    <van-popup v-model="showed" position="right" :style="{ width: '100%',height:'100%' }">
      <van-nav-bar left-arrow @click-left='enterLogin' title="电子云签平台用户使用协议" />
      <div class="agreementP">
        <p><span>电子云签平台由安徽省电子认证管理中心有限责任公司负责运营。本注册与使用协议双方为平台和注册用户（下称“用户”或“您”），本协议具有合同效力，适用于您在本网站的全部活动。</span></p>
        <p><span><br></span></p>
        <p><span>一、注册声明</span></p>
        <p><span>（一）请您在注册成为用户前务必仔细阅读本协议，若您不同意本协议的任意内容，或者无法准确理解平台对条款的解释，请不要进行后续操作；若您注册成为用户，则表示您对本协议的全部内容已充分阅读并认可和同意遵守。同时，承诺遵守中国法律、法规、规章及其他政府规范性文件的规定，如有违反而造成任何法律后果，您将以本人名义独立承担所有相应的法律责任。</span>
        </p>
        <p><span><br></span></p>
        <p><span>（二）本协议内容包括以下条款及已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的一部分，与协议正文具有同等法律效力。平台有权根据需要不定时地制定、修改本协议或各类规则，如本协议及规则有任何变更，一切变更以本网站最新公布的内容为准。经修订的协议、规则一经公布，立即自动生效，对新协议、规则生效之后注册的用户发生法律效力。对于协议、规则生效之前注册的用户，若用户在新规则生效后继续使用本网站提供的各项服务，则表明用户已充分阅读并认可和同意遵守新的协议或规则。若您拒绝接受新的协议和规则，您必须放弃使用平台提供的各项服务（包括但不限于使用用户名和密码登录平台、在平台上进行电子合同签约、证据保存等）。</span>
        </p>
        <p><span><br></span></p>
        <p><span>二、平台服务简介</span></p>
        <p><span>（一）电子合同签约服务</span></p>
        <p><span><br></span></p>
        <p><span>采用电子签名、时间戳等技术，实现对数据电文的安全保护和签章信息的图形化展现，明确电子文件签署者各方的身份信息、签署行为的过程以及签署完成后文件改动，从而使用户在线完成文件的签署。</span></p>
        <p><span><br></span></p>
        <p><span>（二）合同及证据托管、存证、下载服务</span></p>
        <p><span><br></span></p>
        <p><span>用户签署的文件在完成后，将由平台对签署完成的文件本身以及签署的流程信息等内容进行保存。合同的发起方及签署方可在本网站随时下载签署完成的合同。</span></p>
        <p><span><br></span></p>
        <p><span>（三）平台出证服务</span></p>
        <p><span><br></span></p>
        <p><span>平台作为独立的第三方，可独立作出报告文件，该文件包含了合同原文件数据、合同签署方账户信息和签署流程信息，以供本地存档查阅，并可作为调解、仲裁等争议解决过程中的合同相关证据出示。</span></p>
        <p><span><br></span></p>
        <p><span>三、用户账户</span></p>
        <p><span>（一）用户注册与实名认证</span></p>
        <p><span><br></span></p>
        <p><span>1.个人及企业在本网站注册方可成为平台的用户。个人及企业注册成为平台用户后须进行实名认证。在注册与实名认证过程中个人及企业必须根据本网站的要求提供最新、真实、有效及完整的资料。其中，根据实名认证方式的不同，个人所需提供的实名认证资料将有所差异，具体所需资料请以本网站要求为准。</span>
        </p>
        <p><span><br></span></p>
        <p><span>2.实名认证具体操作流程请严格按照本网站实名认证规定的流程履行，否则将影响实名审核的结果。</span></p>
        <p><span><br></span></p>
        <p><span>3.用户同意并授权平台审核、核对用户资料信息以确认用户身份，但用户信息是由用户本人自行提供的，故平台无法保证该信息之准确、有效和完整。所提交的用户认证信息将用于核发其专属的电子签名文件，平台将对用户的信息严格保密。</span>
        </p>
        <p><span><br></span></p>
        <p><span>（二）账户安全</span></p>
        <p><span><br></span></p>
        <p><span>1.平台将通过用户的登录名、密码以及登陆后的其他操作识别用户的相关指示，同时平台会通过本服务应用识别来自用户使用的各类产品或设备的指示，用户应当妥善保管平台登录名、密码、身份信息，各类产品或设备，对于因用户泄露登录名、密码、身份信息或是因产品或设备遗失导致的损失，由用户自行承担。用户应在登录本系统时段结束时，以正确步骤离开网站。用户如果发现有他人冒用或盗用其平台登录名及密码或任何其他未经合法授权之情形，或发生与平台账户关联的手机或其他设备遗失或其他可能危及到平台账户安全情形时，应立即以有效方式通知本公司，向本公司申请账户锁定。</span>
        </p>
        <p><span><br></span></p>
        <p><span>2.用户应对其持有的平台账户负责，只有用户本人方可使用该账户。该账户不可转让、不可继承，在您决定不再使用该账户时，您应将该账户内的数据导出或删除，并按本公司规定流程向本公司申请锁定该账户。</span>
        </p>
        <p><span><br></span></p>
        <p><span>3.平台可以暂时停止提供或者限制本服务部分功能，或提供新的功能，在任何功能减少、增加或者变化时，只要用户仍然使用本服务，即表示同意本协议或者变更后的协议。</span></p>
        <p><span><br></span></p>
        <p><span>4.平台对因用户未能遵守本协议的约定而发生的任何直接或间接损失等不利后果不承担任何责任。</span></p>
        <p><span><br></span></p>
        <p><span>5.平台有权了解您使用本公司产品或服务的真实交易背景及目的，用户应如实提供本公司所需的真实、全面、准确的信息。如果本公司有合理理由怀疑用户提供虚假信息、进行欺诈等违法违规行为的，本公司有权根据相关国家法律法规的规定对用户个人信息以及签署的文件信息等进行核实、查询、披露，有权锁定相应账户并配合相关机关进行后续调查。</span>
        </p>
        <p><span><br></span></p>
        <p><span>四、使用事项</span></p>
        <p><span>（一）您在使用平台服务时，必须遵守国家各项法律、法规、规章以及政府规范性文件，并接受平台相关的协议、规则、规定、程序和惯例的约束。禁止在本网站进行任何可能违反国家法律、法规、规章和政府规范性文件的行为（包括但不限于侵犯任何第三方著作权、专利权、商标权、商业秘密、隐私权、名誉权或其它权利的行为）或者任何未经授权使用本网站的行为（包括但不限于擅自进入本网站未公开的系统、不正当的使用密码和网站的任何内容等）。</span>
        </p>
        <p><span><br></span></p>
        <p><span>（二）注册成功后，每位用户都拥有一个属于自己的用户名和登录密码，通过使用该用户名和登录密码您可以登录平台，从而使用平台服务。您须妥善保管您在平台上的用户名和密码。本网站通过您的用户名、密码以及登录后的操作来识别您的指令。您确认，使用您的用户名和密码登录本网站后在本网站的一切行为均代表您本人意志。使用您的用户名和密码登录操作所产生的电子信息记录均为您行为的有效凭据，并由您本人承担相应的法律后果。不得在未经平台许可的情况下出售或授权使用账号。</span>
        </p>
        <p><span><br></span></p>
        <p><span>（三）您对通过平台发布的所有信息（内容包括但不限于个人信息、商业信息，形式包括但不限于文字、图片）的真实性、准确性、即时性、完整性和合法性独立承担所有责任。同时，在您所发布的信息中不得含有蓄意毁坏、恶意干扰、秘密地截取或侵占任何系统、数据或个人资料的任何病毒、伪装破坏程序、电脑蠕虫、定时程序炸弹或其他电脑程序。</span>
        </p>
        <p><span><br></span></p>
        <p><span>（四）请注意：根据《电子签名法》的规定下列情形不适合使用电子文书：涉及婚姻、收养、继承等人身关系的；涉及土地、房屋等不动产权益转让的；涉及停止供水、供热、供气、供电等公用事业服务的；法律、行政法规规定的不适用电子文书的其他情形。因此，用户不得在平台平台上签订上述法律文件。若用户在平台平台上传并签订上述法律文件，而根据法律之规定上述签约行为无效的，平台不承担任何责任。</span>
        </p>
        <p><span><br></span></p>
        <p><span>（五）本网站内容可能涉及由第三方所有、控制或运营的其它网站（以下称“第三方网站”）。本网站不能保证也没有义务保证第三方网站上的信息的真实性和有效性。您应按照第三方网站的相关协议与规则使用第三方网站，而不是按照本协议。第三方网站的内容、产品、广告和其他任何信息均由您自行判断并承担风险，而与本网站无关。</span>
        </p>
        <p><span><br></span></p>
        <p><span>五、用户间纠纷处理</span></p>
        <p><span>（一）用户应在使用平台服务时，应审慎核查签署各方的身份信息，对于签署方中有未经平台实名认证的用户，可能产生签约主体不明或签约主体错误的风险，如需避免此风险，请各签署方进行实名认证并审慎核查签署方身份。否则，因此而产生的风险和责任，由用户自行承担。</span>
        </p>
        <p><span><br></span></p>
        <p><span>（二）在使用平台的过程中，用户发现任何可能侵害自己或平台权利的事实时，应及时通知平台并提供相应的证明材料。因投诉不实给平台或第三方造成损失的，用户应承担法律责任。</span></p>
        <p><span><br></span></p>
        <p><span>（三）平台有权接受并处理您与其他用户间因使用平台服务而产生的纠纷及投诉，有权通过电话、短信、电子邮件等联系方式向您了解情况，并将所了解的情况通过上述方式通知对方。您有义务在收到平台通知后，在指定的时间内提供相应的资料，以配合纠纷及投诉的情况了解与处理，否则，平台有权单方面独立判断其他用户对您的投诉，一旦成立，并做出对您不利的处理结果。同时，平台有权立即中止或终止您的相关平台服务。</span>
        </p>
        <p><span><br></span></p>
        <p><span>（四）平台受理、处理纠纷、争议及投诉完全依据您的授权。因平台对证据的鉴别能力及对纠纷的处理能力有限，不保证处理结果一定符合您的期望。平台有权决定是否参与争议的处理。</span></p>
        <p><span><br></span></p>
        <p><span>（五）经生效法律文书确认用户存在违法或违反本协议行为或者平台自行判断您涉嫌存在违法或违反本协议行为的，平台有权公布用户的违法行为并做出相应处理，包括但不限于终止服务、永久禁止使用平台等。</span>
        </p>
        <p><span><br></span></p>
        <p><span>六、知识产权声明</span></p>
        <p><span>无论是否明示，平台对网站内所有非公有领域或非他方专有的信息内容享有知识产权（包括但不限于商标权、专利权、著作权），信息内容包括但不限于文字、图片、软件、音频、视频、数据、源代码、设计。非经平台书面授权同意，任何组织或个人都不得复制、打印和传播属于平台的信息内容用于其他用途。网站所有的产品、技术及程序均属于平台知识产权，未经平台书面授权许可，任何人不得擅自使用（包括但不限于以非法的方式打印、复制、传播、展示、下载等）。否则，平台将依法追究其法律责任。</span>
        </p>
        <p><span><br></span></p>
        <p><span>七、免责声明</span></p>
        <p><span>（一）您有义务在注册时提供自己的真实、最新、完整的资料，并保证电子邮件地址、联系电话、联系地址、邮政编码等内容的最新、有效性及安全性。您有义务维护并立即更新您的个人资料，确保其真实、最新、有效及完整。若您提供任何错误、虚假、过时或不完整的资料，或者本网站有合理的理由怀疑您提供的为错误、虚假、过时或不完整的资料时，本网站有权暂停或终止您的账号，并拒绝您使用本网站部份或全部服务。在此情况下，本网站不承担任何责任，并且您同意自行承担因此所产生的直接或间接的任何支出或损失。</span>
        </p>
        <p><span><br></span></p>
        <p><span>（二）在如下情况，平台有权中止、终止对您提供部分或全部服务而不承担任何责任：</span></p>
        <p><span><br></span></p>
        <p><span>1.在平台未向您收费的情况下，平台可自行全权决定以合理理由 (包括但不限于您已违反本协议的字面意义和精神，或您以不符合本协议的字面意义和精神的方式行事) 终止您的登录密码、用户名 (或其任何部份) 或您对服务的使用。</span>
        </p>
        <p><span><br></span></p>
        <p><span>2.在出现下列任一情况时，平台可立即发出警告，中止或终止您的账号，删除您的任何现有信息，以及您在网站上展示的任何其他资料：（a）您违反本协议；(b)平台无法核实或鉴定您向平台提供的任何资料；（c）平台相信您的行为可能会使您、平台其他用户或通过平台提供服务的第三者服务供应商发生任何法律责任；(d)发现您从事涉及网站的诈骗等违法违规活动，平台有权中止或终止您的服务。对于（a）、（b）、(c)三项，平台不限制用户采取相关补救措施。</span>
        </p>
        <p><span><br></span></p>
        <p><span>3.对于本协议规定的采取的中止或终止措施，平台不对结果承担任何责任。</span></p>
        <p><span><br></span></p>
        <p><span>4.根据本协议的任何规定中止或终止您使用服务之措施，平台将本着审慎的态度实施，并将履行告知义务，即使通知您不能继续使用平台的服务，但在您的账号内的所有相关资料，平台将继续为您保存，且可以查询和为您提供相关文件内容的证明。</span>
        </p>
        <p><span><br></span></p>
        <p>
          <span>5.由于互联网本身所具有的不稳定性，平台无法保证服务不会中断。系统因有关状况无法正常运作，使用户无法使用任何平台服务或使用平台服务受到任何影响时，平台对用户或第三方不负任何责任，前述状况包括但不限于：</span>
        </p>
        <p><span><br></span></p>
        <p><span>（1）平台系统停机维护期间。</span></p>
        <p><span><br></span></p>
        <p><span>（2）电信设备出现故障不能进行数据传输的。</span></p>
        <p><span><br></span></p>
        <p><span>（3）由于黑客攻击、网络供应商技术调整或故障、网站升级、银行方面的问题等原因而造成的平台服务中断或延迟。</span></p>
        <p><span><br></span></p>
        <p><span>（4）因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成平台系统障碍不能执行业务的。</span></p>
        <p><span><br></span></p>
        <p>
          <span>6.因用户的过错导致的任何损失，该过错包括但不限于：操作不当、遗忘或泄露密码、密码被他人破解、用户使用的计算机系统被第三方侵入、用户委托他人代理签署时他人恶意或不当操作而造成的损失，平台不承担任何责任。</span>
        </p>
        <p><span><br></span></p>
        <p><span>八、违约责任</span></p>
        <p><span>（一）因您违反本协议或经在此提及而纳入本协议的其他文件，或因您违反了法律、法规、规章、政府规范性文件或侵害了第三方的权利，而使第三方对平台及其股东、职员、代理人提出索赔要求（包括司法费用和其他专业人士的费用），您必须对平台及股东 、职员、代理人承担赔偿责任，使其等免遭损失。</span>
        </p>
        <p><span><br></span></p>
        <p><span>（二）如因平台违反有关法律、法规或本协议项下的任何条款而给用户造成损失，平台同意承担由此造成的损害赔偿责任。</span></p>
        <p><span><br></span></p>
        <p><span>九、法律适用与管辖</span></p>
        <p><span>（一）本协议的订立、变更、执行和解释，以及与本协议有关的争议解决，均应适用中华人民共和国法律。如与本协议有关的某一特定事项没有法律规定或规定不明确，则应参照通用的国际商业惯例和行业惯例。</span>
        </p>
        <p><span><br></span></p>
        <p><span>（二）如因本协议或平台服务所引起或与其有关的任何争议应向深圳平台网络科技有限公司所在地人民法院起诉。</span></p>
        <p><span><br></span></p>
        <p><span>十、其他</span></p>
        <p><span>（一）本协议自您同意勾选并成功注册为本网站用户之日起生效，除非本网站终止本服务协议或者用户丧失本网站用户资格，否则本服务协议始终有效。本服务协议终止并不免除用户根据本服务协议或其他有关协议、规则所应承担的义务和责任。</span>
        </p>
        <p><span><br></span></p>
        <p><span>（二）本服务协议部分条款被认定为无效时，不影响本服务协议其他条款的效力。</span></p>
        <p><span><br></span></p>
        <p><span>（三）本协议中的标题仅为方便而设，在解释本协议时应被忽略。</span></p>
        <p><span><br></span></p>
        <p><span>（四）平台对本服务协议享有最终的解释权。</span></p>

      </div>
    </van-popup>
  </div>
</template>

<script>
  import {
    getCode,
    checkUser,
    getToken,
    userRegist
  } from '@/api/login';
  import {
    setToken
  } from '@/libs/util'
  import {
    mapActions
  } from 'vuex'
  export default {
    data() {
      return {
        phone: '',
        registerNumber: '',
        disabled: false,
        password: '',
        confrimpassword: '',
        time: 60,
        registercode: '获取验证码',
        checked: true,
        timer: null,
        showed:false
      }
    },
    methods: {
      ...mapActions([
        'setUser'
      ]),
      checkIphoneNumber() {
        if (this.phone != '' && !(/^1[3456789]\d{9}$/.test(this.phone))) {
          this.$toast({
            message: '手机号码格式错误',
            duration: 2000,
          })
        }
      },
      showIphoneMessage() {
        let errormessage = '';
        if (this.phone == '') {
          errormessage = '手机号不能为空';
        } else if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
          errormessage = '手机号格式不正确';
        } else if (this.registerNumber == '') {
          errormessage = '验证码不能为空';
        } else if (!(/^[0-9]{6}$/.test(this.registerNumber))) {
          errormessage = '验证码格式不正确';
        } else if (this.password == '') {
          errormessage = '密码不能为空';
        } else if (!(/^[a-zA-Z0-9]{6,18}$/.test(this.password))) {
          errormessage = '密码格式不正确';
        } else if (this.confrimpassword == '') {
          errormessage = '确认密码不能为空';
        } else if (!(/^[a-zA-Z0-9]{6,18}$/.test(this.confrimpassword))) {
          errormessage = '确认密码格式不正确';
        } else if (this.checked == false) {
          errormessage = '请选择用户使用协议';
        }
        if (errormessage) {
          this.$toast({
            message: errormessage,
            duration: 2000,
          })
        } else {
          if (this.confrimpassword != this.password) {
            this.$toast({
              message: '密码不一致',
              duration: 2000,
            })
          } else {
            checkUser(this.phone).then((res) => {
              if (res.data != null) {
                this.$toast({
                  message: '手机号码已存在',
                  duration: 2000,
                })
              } else {
                userRegist(this.phone, this.password).then((res) => {
                  if (res.code === 0) {
                    getToken('2', this.phone, this.password, '').then(res => {
                      if (res.code === 0) {
                        setToken(res.data)
                        this.getUserInfoAjax(res.data)
                      }
                    })
                  }
                })
              }
            })
          }
        }
      },
      getUserInfoAjax() {
        this.setUser().then(res => {
          if (res.code === 0) {
            this.$router.push('home')
          }
        })
      },
      rightPop(){
         this.showed = true;
         document.title = '用户须知';
      },
      enterLogin(){
           this.showed = false;
           document.title = '新用户注册';
      },
      checkLoginButton() {
        if (this.phone != "" && (/^1[3456789]\d{9}$/.test(this.phone))) {
          this.disabled = true;
          this.time = 60;
          this.timer = setInterval(() => {
            if (this.time === 0) {
              this.clearTime()
            } else {
              this.time--
              this.registercode = this.time + 's';
            }
          }, 1000);
          checkUser(this.phone).then((res) => {
            if (res.data != null) {
              this.$toast({
                message: '手机号码已存在',
                duration: 2000,
              })
            } else {
              getCode(this.phone).then((res) => {
                if (res.code !== 0) {
                  this.clearTime()
                  this.$toast(res.msg)
                }
              })
            }
          })
        } else {
          this.$toast({
            message: '请输入正确的手机号',
            duration: 2000,
          })
        }
      },
      clearTime() {
        this.disabled = false
        this.registercode = '获取验证码'
        clearInterval(this.timer)
      }
    },
    beforeCreate() {
      document.querySelector('body').setAttribute('style', 'margin:0px')
    },
    beforeDestroy() {
      document.querySelector('body').removeAttribute('style')

    }
  }

</script>
<style scoped lang="less">
  .van-nav-bar .van-icon {
    color: #323233;
  }
  .van-nav-bar{
  display: block;
}
  .passworld-login {
    width: 100%;
  }

  .login-line {
    width: 100%;
    height: 15*@precision;
    background: #f2f2f2;
  }

  .two-box {
    width: 80%;
    margin: 10*@precision auto 0;
  }

  .login-button {
    width: 100%;
    margin: 0 auto;
  }

  .iphone-number,
  .login-passworld-icon,
  .login-register-icon {
    margin: 0 auto 0;
    position: relative;
    width: 100%;
    height: 130*@precision;
    border-bottom: 1px #e6e6e6 solid;
    display: flex;
    align-items: center;
  }

  .iphone-number img {
    width: 30*@precision;
    height: 42*@precision;
    margin-left: 25*@precision;
  }

  .login-passworld-icon img {
    width: 30*@precision;
    height: 38*@precision;
  }

  .login-register-icon img {
    width: 34*@precision;
    height: 23*@precision;
  }

  .login-passworld-icon img,
  .login-register-icon img {
    margin-left: 20*@precision;
  }

  .iphone-input,
  .iphone-passworld-input,
  .ipone-register-input {
    width: 300*@precision;
    float: left;
    margin-left: 25*@precision;
  }

  .register-number {
    display: flex;
    align-items: center;
    margin-left: 64*@precision;
  }

  .van-button {
    width: 180*@precision;
    height: 68*@precision;
    border-radius: 8*@precision;
    line-height: 65*@precision;
    font-size: 26*@precision;
  }

  .van-button--normal {
    padding: 0 0;
  }

  .van-button--primary {
    background: #1abc9c;
    border: 1px #1abc9c solid;
  }

  .user-indication {
    display: flex;
    align-items: center;
    line-height: 20*@precision;
    margin-top: 28*@precision;
    width: 80%;
    font-size: 24*@precision;
  }

  .user-agreement-one {
    color: #666666 !important;
    margin-left: 20*@precision;
  }

  .user-agreement {
    color: #4f99f9;
  }

  .login-button {
    cursor: pointer;
    margin-top: 48*@precision;
    margin-bottom: 26*@precision;
    height: 89*@precision;
    background: #1abc9c;
    color: white;
    text-align: center;
    line-height: 89*@precision;
    border-radius: 10*@precision;
    font-size: 36*@precision;
  }

  .account-number-login {
    text-align: center;
    font-size: 30*@precision;
  }

  .account-number-login a {
    color: #4f99f9;
  }

  .agreementP{
    color: #767676;
    padding: 0 20px 40px;
    
  }
  .agreementP p{
       margin:10px 0;
     }

</style>
<style lang="less">

</style>
