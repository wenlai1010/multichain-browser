/**
 * Created by donglele on 2017/11/2.
 */
export default {
    zh: {
        lang: '中',
        minago: '分钟前',
        hourago: '分钟前',
        dayago: '天前',
        justnow: '刚刚',

        grabBtn: '抢',
        obtain: '获得了',
        getDetail: '活动详情',
        getAddress: '获取SSC地址',

        grabTip: '输入SSC地址随机获得0-10个SSC',
        youObtain: '恭喜！你获得了',
        viewTrans: '查看交易记录',
        expireTxt: '活动已结束',
        emptyAddr: '请输入SSC地址',
        wrongAddr: 'SSC地址不正确',
        addrErr: 'SSC地址错误, 或暂不支持子地址',
        doubleApply: '一个用户仅能参与一次',
        orderNotExist: '该订单不存在',

        bonusDetail: `<p>SelfSell Contract 体验计划第一弹：红包合约<br>
        为了让SelfSell社区成员更好的体验SelfSell contract，发现contract的魅力，激发成员对contract的兴趣，SelfSell特公布体验计划。</p>
        <dl>
            <dt>红包合约： </dt>
            <dd>输入地址免费获得0-10个SSC</dd>
            <dt>合约名称：</dt>
            <dd>SSC_Reward</dd>
            <dt>合约函数: </dt>
            <dd>grab</dd>
            <dt>合约规则：</dt>
            <dd>用户调用合约函数<i>grab</i>，支付合约调用手续费，合约随机给用户地址打0-10个SSC</dd>
        </dl>
        <p style="margin-top:.32rem">为了方便用户体验，调用函数由网页DApp执行，手续费由SelfSell代付，用户只需输入自己的SSC地址即可随机获得0-10个SSC</p>`,

        networkErr: '网络异常，请稍后再试',
        applyErr: '申请失败,请重新申请',

    },


    en: {
        lang: 'En',
        minago: ' minutes ago',
        hourago: ' hours ago',
        dayago: ' days ago',
        justnow: 'just now',

        grabBtn: 'Grab',
        obtain: 'obtained',
        getDetail: 'Activity Detail',
        getAddress: 'Get SSC Address',

        grabTip: 'Enter SSC address to get 0-10 SSC randomly',
        youObtain: 'You obtained',
        viewTrans: 'View transaction records',
        expireTxt: 'Activity is ending',
        emptyAddr: 'Please enter an SSC address',
        wrongAddr: 'The SSC address is invalid',
        addrErr: 'The SSC address is wrong, or no support for sub-address yet',
        doubleApply: 'Each user can only participate once',
        orderNotExist: 'The order does not exist',

        bonusDetail: `<p>SelfSell Contract experience first bomb: Lucky package contract<br>
        In order to let the members of the SelfSell community have a better experience of SelfSell contract, found the charm of contract, stimulate the interest of contract members, SelfSell announced plans to experience.</p>
        <dl>
            <dt>Lucky Package contract: </dt>
            <dd>Inputting the address to get 0-10 ACT free</dd>
            <dt>Contract name:</dt>
            <dd>SSC_Reward</dd>
            <dt>Contract function:</dt>
            <dd>grab</dd>
            <dt>Contract rules: </dt>
            <dd>The user uses the contract function <i>grab</i>, the payment contract uses the poundage, the contract randomly sends 0-10 SSC to the user address</dd>
        </dl>
        <p style="margin-top:.32rem">For the convenience of the user experience, the function performed by the DApp fee from SelfSell payment, users only need its own SSC address can be randomized to receive 0-10 SSC input</p>`,

        networkErr: 'Network exception, please try later',
        applyErr: 'Failed to apply, please try later',

    }
}
