package com.ssafy.fullerting.bid_log.controller;

import com.ssafy.fullerting.bid_log.model.dto.request.BidProposeRequest;
import com.ssafy.fullerting.bid_log.service.BidService;
import com.ssafy.fullerting.deal.service.DealService;
import com.ssafy.fullerting.global.utils.MessageUtils;
import com.ssafy.fullerting.user.model.entity.CustomUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/exchanges")
@Tag(name = "입찰 기능 API", description = "입찰과 관련된 기능 제공")
public class bidLogController {

    private final DealService dealService;
    private final BidService bidService;

    @PostMapping("/{ex_article_id}/deal")
    @Operation(summary = "가격 제안하기 ", description = "가격 제안하기")
    public ResponseEntity<MessageUtils> register(@RequestBody BidProposeRequest bidProposeRequest,
                                                 @PathVariable Long ex_article_id, @AuthenticationPrincipal CustomUser user) {
        bidService.deal(bidProposeRequest, user, ex_article_id);
        log.info("[New User]: {}", bidProposeRequest.toString());
        return ResponseEntity.ok().body(MessageUtils.success());
    }




}
